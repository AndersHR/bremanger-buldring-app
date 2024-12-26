import { useEffect, useState } from "react";
import { IconImage, Type } from "./IconButton";
import styles from "./ui.module.css";

export default function NavBar({ isVisible }: { isVisible: boolean }) {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure that the component is only rendered on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Do not render anything until the component is mounted (client-side)
  if (!isMounted) return null;

  const dynamicStyle = {
    transition: "transform 0.3s ease-in-out",
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
  };

  return (
    <nav className={styles.navbar} style={dynamicStyle}>
      <ul>
        <NavBarElement
          text={"Alle buldere"}
          url={"/"}
          ariaLabel={"Alle buldere"}
          icon="/icons8-cave-96.png"
          type="tertiary"
        />
        <NavBarElement
          text={"Samlinger"}
          url={"/samling"}
          ariaLabel={"Samlinger"}
          icon="/icons8-alps-96.png"
          type="tertiary"
        />
      </ul>
    </nav>
  );
}

function NavBarElement({
  text,
  url,
  type,
  icon,
  ariaLabel,
}: {
  text: string;
  url: string;
  type: Type;
  icon: string;
  ariaLabel: string;
}) {
  return (
    <li>
      <a href={url}>
        <div className={styles.navbarContentWrapper}>
          <div className={styles.navbarContent}>
            <IconImage
              type={type}
              icon={icon}
              ariaLabel={ariaLabel}
              width="24px"
              height="24px"
            />
            <div>{text}</div>
          </div>
        </div>
      </a>
    </li>
  );
}
