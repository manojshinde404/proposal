"use client";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Home() {

  const [showVideo, setShowVideo] = useState(false);
  const [noPos, setNoPos] = useState({top:"50%",left:"60%"});
  const [size, setSize] = useState({width: 0, height:0});
  const [answer, setAnswer] = useState<string | null>(null);


  useEffect(() => {
    setSize({
      width:window.innerWidth,
      height:window.innerHeight
    });

    const saved = localStorage.getItem("answer");
    if (saved === "YES") {
      setAnswer("YES");
      setShowVideo(true);
    }
  }, []);

  const moveNoButton = () => {
    const top = Math.random() * 80 + "%";
    const left = Math.random() * 80 + "%";
    setNoPos({top, left});
  };

  const handleYes = () => {
    setAnswer("YES");
    setShowVideo(true);
    localStorage.setItem("answer", "YES");
  };

  const restart = () => {
    setShowVideo(false);
    setNoPos({ top: "50%", left: "60%" });
  };


  return (
      <main style={styles.container}>
        {showVideo && <ReactConfetti width={size.width} height={size.height} />}

        <h1 style={styles.title}>Will You Marry Me? 💍❤️</h1>

        {!showVideo && (
          <>
          <div style={styles.buttonWrap}>
            <button style={styles.yesBtn} onClick={handleYes}>
              YES 😍
            </button>
            <button
              style={{...styles.noBtn, ...noPos}}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              NO 😅
            </button>
          </div>
          </>
        )}

        {showVideo && (
        <div style={styles.popup}>
          <p style={{ fontSize: "22px" }}>
            Your answer: <strong>{answer}</strong>
          </p>

          <h2>Good decision 😘 You’ll always be mine ❤️</h2>
          <video width="420" autoPlay controls>
            <source src="/love.mp4" type="video/mp4" />
          </video>

          <button style={styles.restartBtn} onClick={restart}>
            Restart 🔁
          </button>
        </div>
      )}
      </main>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(#ff9a9e, #fad0c4)",
  },

  title: {
    fontSize: "50px",
    marginBottom: "50px",
  },

  buttonWrap: {
    position: "relative",
    width: "400px",
    height: "200px",
  },

  yesBtn: {
    padding: "15px 30px",
    fontSize: "20px",
    borderRadius: "10px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  noBtn: {
    position: "absolute",
    padding: "15px 30px",
    fontSize: "20px",
    borderRadius: "10px",
    background: "#555",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  popup: {
    textAlign: "center",
  },

  restartBtn: {
    marginTop: "20px",
    padding: "10px 25px",
    fontSize: "18px",
    borderRadius: "10px",
    background: "#222",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
