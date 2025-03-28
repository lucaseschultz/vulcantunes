export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="copyright">
        Copyright © {currentYear}
        <a href="https://www.vulcantunes.com"> VulcanTunes.com</a>
      </div>
    </footer>
  );
}