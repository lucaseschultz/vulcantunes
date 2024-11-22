export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>
        Copyright © {currentYear}
        <a href="https://www.vulcantunes.com"> VulcanTunes.com</a>
      </div>
    </footer>
  );
}