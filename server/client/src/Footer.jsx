import logo from './Logo_white.svg';

export default function Footer () {
  return (
    
        <footer>
            <div className="footer-content">
                <img src={logo} alt="Robot Monkey LLC" className="company-logo" />
                <span className="footer-note">Created by Robot Monkey LLC</span>
            </div>
        </footer>    
    )
}