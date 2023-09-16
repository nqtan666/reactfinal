import videoHomepage from "../../assets/video-homepage.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="content-title1">Forms that break the norm</div>
        <div className="content-title2">
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </div>
        <div className="content-title3">
          <button>Get started—it's free</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
