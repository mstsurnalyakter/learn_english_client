import Banner from "../Banner/Banner";
import StudySession from "../StudySession/StudySession";
import Tutor from "../Tutor/Tutor";


const Home = () => {
  return (
    <div className="space-y-20 dark:text-gray-100">
      <Banner/>
      <Tutor/>
      <StudySession/>
    </div>
  );
}

export default Home