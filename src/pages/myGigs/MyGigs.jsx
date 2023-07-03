import { Link } from "react-router-dom";
import "./MyGigs.css";
import { useContext, useEffect, useState } from "react";
import makeRequest from "../../utils/makeRequest";
import { authContext } from "../../context/authProvider/authProvider";

const LoadingComponent = () => {
  return <div>Loading...</div>;
};

export default function MyGigs() {
  const [isFetching, setIsFetching] = useState();
  const [gigs, setGigs] = useState([]);
  const tableHeader = ["cover", "title", "price", "sales", "action"];
  const userData = useContext(authContext).authData;

  const getMyGigs = async (userId) => {
    console.log(userId, "userId");
    try {
      const res = await makeRequest.get("/gigs?userId=" + userId);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const deleteGig = async (id) => {
    try {
      console.log("/" + id);
      const res = await makeRequest.delete("/gigs/" + id);
      setGigs((pre) => pre._id !== res.data);
      return res.data;
    } catch (error) {
      console.log("deleteGigs()", errors);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (userData && userData?._id) {
      setIsFetching(true);
      getMyGigs(userData?._id)
        .then((res) => {
          if (isMounted) setGigs(res);
        })
        .catch((err) => {
          console.log("mygigs", error);
        })
        .finally((s) => {
          setIsFetching(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [userData && userData?._id]);
  return (
    <div className="container">
      <div className="inline-spacing">
        <div className="mygigs-header">
          <div>
            <h2>Gigs</h2>
          </div>
          <Link
            to={"/add"}
            style={{ fontSize: "var(--txt-small)" }}
            className="btn btn-primary"
          >
            <span>Add new gig</span>
          </Link>
        </div>

        {!isFetching ? (
          !gigs || !gigs.length ? (
            <div>You have not any active gig </div>
          ) : (
            <div className="mygigs-table__wrapper">
              <table className="mygigs-table">
                <caption className="visually-hidden">
                  Table of the gigs made by you
                </caption>
                <thead role="rowgroup">
                  <tr role="row">
                    {tableHeader.map((head, index) => {
                      return <th key={index}>{head}</th>;
                    })}
                  </tr>
                </thead>

                <tbody role="rowgroup">
                  {gigs.map((item, i) => {
                    return (
                      <tr role="row" key={i + 1000}>
                        {tableHeader.map((keyword, ind) => {
                          if ((keyword !== "action") & (keyword !== "cover"))
                            return (
                              <td role="cell" data-cell={keyword} key={ind}>
                                {item[keyword]}
                              </td>
                            );
                          else if (keyword === "cover")
                            return (
                              <td role="cell" data-cell={keyword} key={ind}>
                                <img
                                  src={item[keyword]}
                                  alt="the display picture of your gig"
                                />
                              </td>
                            );
                          return (
                            <td role="cell" data-cell={keyword} key={ind}>
                              <button
                                onClick={(e) => {
                                  deleteGig(item["_id"]);
                                }}
                                className="btn"
                                aria-label="delete the gig"
                              >
                                <img
                                  aria-hidden="true"
                                  className="table-dustbin"
                                  src="/img/delete.png"
                                  alt="dustbin"
                                />
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <LoadingComponent />
        )}
      </div>
    </div>
  );
}
