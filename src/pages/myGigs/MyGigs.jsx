import "./MyGigs.css";
export default function MyGigs() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
    img: "/img/star.png",
  };

  const tableHeader = ["img", "title", "price", "sales", "action"];

  const tablecontent = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "stunning concept art",
      price: 50,
      sales: 13,
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "stunning concept art",
      price: 50,
      sales: 13,
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "stunning concept art",
      price: 50,
      sales: 13,
    },
    {
      id: 1,
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      title: "stunning concept art",
      price: 50,
      sales: 13,
    },
  ];
  return (
    <div className="container">
      <div className="inline-spacing">
        <div className="mygigs-header">
          <div>
            <h2>Gigs</h2>
          </div>
          <button
            style={{ fontSize: "var(--txt-small)" }}
            className="btn btn-primary"
          >
            <span>Add new gig</span>
          </button>
        </div>

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
              {tablecontent.map((item, i) => {
                return (
                  <tr role="row" key={i + 1000}>
                    {tableHeader.map((keyword, ind) => {
                      if ((keyword !== "action") & (keyword !== "img"))
                        return (
                          <td role="cell" data-cell={keyword} key={ind}>
                            {item[keyword]}
                          </td>
                        );
                      else if (keyword === "img")
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
                          {" "}
                          <button className="btn" aria-label="delete the gig">
                            {" "}
                            <img
                              aria-hidden="true"
                              className="table-dustbin"
                              src="/img/delete.png"
                              alt="dustbin"
                            />{" "}
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
      </div>
    </div>
  );
}
