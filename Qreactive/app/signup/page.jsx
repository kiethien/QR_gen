import styles from "./signup.module.css";
import React from "react";
import Link from "next/link";
import { faGooglePlusG, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = () => {
  return (
    <div className={styles.container} id={styles.container}>
      <div className={styles.formContainerSignUp}>
        <form>
          <h1 className="text-4xl font-bold dark:text-black">Create Account</h1>
          <div className={styles.socialIcons}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faGooglePlusG} />
            </div>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faGithub} />
            </div>{" "}
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
          <p>
            Already have an account? <Link href="/login-page">Login here</Link>
          </p>
        </form>
      </div>
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={styles.togglePanelRight}>
            <h1 className="text-4xl font-bold dark:text-white">
              Hello, Friend!
            </h1>
            <p>Register with your personal details to use all site features</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
