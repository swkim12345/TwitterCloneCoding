import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid : user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  useEffect(() =>{
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid : user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
      <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/>
      ) : (
        "initializing..."
        )}
      {/*<footer>&copy; {new Date().getFullYear()}Nwitter</footer>*/}
    </>
  );
}

export default App;
