import './App.css';
import React from "react";
import useInput from "./hooks/useInput";
import useTabs from "./hooks/useTabs";
import useTitle from "./hooks/useTitle";
import useClick from "./hooks/useClick";
import useConfirm from "./hooks/useConfirm";
import usePreventLeave from "./hooks/usePreventLeave";
import useBeforeLeave from "./hooks/useBeforeLeave";
import useFadeIn from './hooks/useFadeIn';
import useNetwork from './hooks/useNetwork';
import useScroll from './hooks/useScroll';
import useFullscreen from './hooks/useFullscreen';
import useNotification from './hooks/useNotification';
import useAxios from './hooks/useAxios';


const content = [
  {
    tab:"Section 1",
    content:"I'm the content of the Section 1"
  },
  {
    tab:"Section 2",
    content:"I'm the content of the Section 2"
  }
];


const App = () => {

  const constraints = (value) => {
    return !value.includes("@");
  }
  const name = useInput("Mr.",constraints);

  const { currentItem, changeItem } = useTabs(0,content);

  const titleUpdater = useTitle("Loading...")
  setTimeout(() => titleUpdater("Home"),5000)

  // place for useTitle

  const onClick = () => {
    console.log("clicked!");
  }
  const title = useClick(onClick);

  const deleteWord = () => {
    console.log("Deleting the word");
  }
  const abort =()=>{
    console.log("Aborted");
  }
  const confirmDelete = useConfirm("Are you sure?",deleteWord,abort);

  const {enablePrevent, disablePrevent} = usePreventLeave();

  const begForLife = () => console.log("pls don't leave");
  useBeforeLeave(begForLife);

  const fadeInH1 = useFadeIn(1.5,0.5);

  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline")
  };
  const onLine = useNetwork(handleNetworkChange);

  const {y} = useScroll();

  const onFullS = (isFull) => {
    console.log(isFull ? "We are now in full" : "We are now in small");
  }
  const {element,triggerFull,exitFull} = useFullscreen(onFullS);

  const triggerNotif = useNotification("Can I steal your kimchi?",{body:"I love kimchi, don't you?"});

  const {loading, error, data, refetch} = useAxios({url:"https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json"});
  

  return (
    <div>
      <div className="useState">
        <h1>useState</h1>
        <p>Changes the state of something</p>

          <div className="useInput">
          <h2>useInput</h2>
          <input placeholder="Name" {...name} /><br></br>
          </div>

          <div className="useTabs">
            <h2>useTabs</h2>
              {content.map((section,index) => {
              return <button onClick={() => changeItem(index)}>{section.tab}</button>
            })}
            <div>{currentItem.content}</div>
          </div>
      </div>


      <div className="useEffect">
        <h2>useEffect</h2>
        <p>Do the role of componetDidMount/DidUpdate/WillUnmount
          when got no dependencies, 
          and componetDidMount/DidUpdate when got dependencies
        </p>

        <div className="useTitle">
          <h2>useTitle</h2>
          <p>title goes to "Home" at 5 seconds later</p>
        </div>

        <div className="useClick">
          <h2>useClick</h2>
          <p>Click the button and check the console!</p>
            <button ref={title}>Click here!</button>
        </div>

        <div className="useConfirm">
          <h2>useConfirm</h2>
          <p>Click the button, confirm or abort alert, and check the console!</p>
          <button onClick={confirmDelete}>Delete the world</button>
        </div>

        <div className="usePreventLeave">
          <h2>usePreventLeave</h2>
          <button onClick={enablePrevent}>Protect</button>
          <button onClick={disablePrevent}>Unprotect</button>
        </div>

        <div className="useBeforeLeave">
          <h2>useBeforeLeave</h2>
          <p>let your mouse cursor out of the screen 
            and check what happens at the console. 
            (clientY is less or equal than 0)</p>
        </div>

        <div className="useFadeIn">
          <h2>useFadeIn</h2>
          <p>Hello! will fade in with duration of 1.5s and delay of 0.5s</p>
          <h3 {...fadeInH1}>Hello!</h3>
        </div>

        <div className="useNetwork">
          <h2>useNetwork</h2>
          <p>"Online" below goes offline when the browser goes offline</p>
          <h3>{onLine ? "Online" : "Offline"}</h3>
        </div>

        <div className="useScroll">
          <h2>useScroll</h2>
          <p>In fullscreen situation, "Hi" below turns red when "y" goes higher 
            than 1300 which can be found in the console</p>
          <h3 style={{color: y > 1300 ? "red" : "blue"}}>Hi</h3>
        </div>

        <div className="useFullscreen">
          <h2>useFullscreen</h2>
          <div ref={element} style={{border:"0px",padding:"0"}}>
            <img 
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhtml5box.com%2Fhtml5gallery%2Fimages%2FWilderness_1024.jpg&f=1&nofb=1" 
          alt="" style={{width:"200px"}} 
          ></img><br></br>
          <button onClick={exitFull}>Exit Fullscreen!</button>
          </div>
          <br></br>
          <button onClick={triggerFull}>Make Fullscreen!</button>
        </div>

        <div className="useNotification">
          <h2>useNotification</h2>
          <p>Don't reject the alarm call!!!</p>
          <button onClick={triggerNotif}>Notification</button>
        </div>

        <div className="useAxios">
            <h2>useAxios</h2>
            <p>Check the console and see what useAxios does</p>
            <h4>fetch status : {data && data.status}</h4>
            <h4>{loading? "loading":"loaded"}</h4>
            <button onClick={refetch}>Refetch</button>
        </div>

      </div>
    </div>
    

  );
};

// class AppUgly extends React.Component {
//   state = {
//     item:1
//   }
//   render() {
//     const {item} = this.state;
//     return(
//       <div>
//       <h1>item: {item}</h1>
//       <button onClick={this.incrementItem}>Increment</button>
//       <button onClick={this.decrementItem}>Decrement</button>
//     </div>
//     )
//   }
//   incrementItem= () => {
//     this.setState(state => {
//       return {
//         item:state.item +1
//       };
//     });
//   };
//   decrementItem= () => {
//     this.setState(state => {
//       return {
//         item:state.item =1
//       };
//     });
//   };
// }

export default App;
