import "./Profilepicture.css";
export default function Profilepicture({ userInitial, userPP }) {
  return (
    <div className="userProfile">
        <div>
      <figure aria-hidden="true">
        {userPP? <img src={userPP} alt="" /> : <></>}
        <figcaption>{userInitial}</figcaption>
      </figure>
    </div>
    </div>
  );
}
