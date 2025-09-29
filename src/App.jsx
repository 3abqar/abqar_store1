import { useEffect, useMemo, useState } from "react";
import "./App.css";

function useCountdown(targetDateIso) {
  const target = useMemo(
    () => new Date(targetDateIso).getTime(),
    [targetDateIso]
  );
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const targetDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString();
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="coming-soon">
      <div className="bg"/>

      <header className="header">
        <div className="brand">
          <div className="brand-mark">F</div>
          <span className="brand-name">Feastly</span>
        </div>
      </header>

      <main className="content">
        <div className="glass">
          <p className="eyebrow">Restaurants • Catering • Experiences</p>
          <h1 className="headline">We’re cooking up something special</h1>
          <p className="subhead">
            A modern way to discover, book, and savor the best restaurants.
            Feastly launches soon.
          </p>

          <div className="countdown" role="timer" aria-live="polite">
            <div className="time">
              <span className="num">{String(days).padStart(2, "0")}</span>
              <span className="label">Days</span>
            </div>
            <div className="sep">:</div>
            <div className="time">
              <span className="num">{String(hours).padStart(2, "0")}</span>
              <span className="label">Hours</span>
            </div>
            <div className="sep">:</div>
            <div className="time">
              <span className="num">{String(minutes).padStart(2, "0")}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="sep">:</div>
            <div className="time">
              <span className="num">{String(seconds).padStart(2, "0")}</span>
              <span className="label">Seconds</span>
            </div>
          </div>

          <form className="notify" onSubmit={onSubmit} noValidate>
            <input
              type="email"
              className="input"
              placeholder="Enter your email to get notified"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button className="button" type="submit">
              Notify me
            </button>
          </form>

          {submitted && (
            <p className="success" role="status">
              You’re on the list! We’ll let you know when Feastly opens.
            </p>
          )}

          <div className="badges">
            <span className="badge">Curated spots</span>
            <span className="dot" />
            <span className="badge">Instant bookings</span>
            <span className="dot" />
            <span className="badge">Exclusive perks</span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Feastly. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
