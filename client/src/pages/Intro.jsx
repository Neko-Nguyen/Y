import "../styles/Intro.css";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { AuthContext } from "../helpers/AuthContext";

gsap.registerPlugin(SplitText);

function Intro() {
  let navigate = useNavigate();
  const intro1Ref = useRef(null);
  const intro2Ref = useRef(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const timeLine = gsap.timeline();
    
    if (intro1Ref.current) {
      const split = new SplitText(intro1Ref.current, { type: "chars" });

      timeLine.from(split.chars, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05
      });
    }

    if (intro2Ref.current) {
      const split = new SplitText(intro2Ref.current, { type: "chars" });

      timeLine.from(split.chars, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05
      }, "+=0.5");
    }
  }, []);

  return (
    <div 
        className="intro-container"
        onClick={() => { 
          if (authState.id > 0) navigate("/home");
          else navigate("/login"); 
        }}
    >
        <h1 ref={intro1Ref} className="intro-line-1">
            <img src="/logo.png" alt="logo" className="intro-logo"/>
            are you here ?
        </h1>
        <h2 ref={intro2Ref} className="intro-line-2">
            To make friends of course ! 
        </h2>
    </div>
  );
}

export default Intro;
