// import Notes from './Notes';
// const Home = (props) => {
//   return (
//     <div>
      
//       <Notes showalert={showalert}/> {/* Ensure Notes.js exists and is imported correctly */}
//     </div>
//   );
// };

// export default Home;

import Notes from './Notes';

const Home = ({ showalert }) => {  // Destructure props to get showalert
  return (
    <div>
      <Notes showalert={showalert} /> {/* Ensure Notes.js exists and is imported correctly */}
    </div>
  );
};

export default Home;
