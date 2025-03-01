import styles from './footer.module.css'
import csumbLogo from './assets/CSUMB_Logo.png'

const Footer = () => {
    return (
        <footer className = {styles.footer}>
            <div className = {styles.footerContent}>
                <img 
                src = {csumbLogo}
                alt = "CSUMB_Logo" 
                className = "footer-logo"
                style = {{
                    height: '80px',
                    width: 'auto'
                }}
                />
                <p style = {{
                    color: "#baf5ff"
                }}>© 2025 California State University, Monterey Bay</p>
            </div>
        </footer>
    );
};

export default Footer;