import React from "react";
import { HiMail } from "react-icons/hi";
import { BsTwitter } from "react-icons/bs";
import { AiFillHome, AiOutlineGithub } from "react-icons/ai";
import LogoSecondary from "./LogoSecondary";
import FooterCard from "./FooterCard";

const Footer = () => {
  return (
    <footer
      className="
            w-full
            bg-primary
    "
    >
      <div
        className={`
                container
                mx-auto
                xl:px-30
                max-w-6xl`}
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-center
            items-center
            p-10
            md:pt-10
            md:pb-5
            gap-12
        "
        >
          <a href="/" className="cursor-pointer">
            <LogoSecondary />
          </a>

          <FooterCard
            heading="Follow Us"
            subHeading1="GitHub"
            subHeading2="Twitter"
            icon1={AiOutlineGithub}
            icon2={BsTwitter}
            href1="https://github.com/"
            href2="https://twitter.com/"
          />

          <FooterCard
            heading="Legal"
            subHeading1="Privacy Policy"
            subHeading2="Terms & Conditions"
            href1=""
            href2=""
          />
          <FooterCard
            heading="contact"
            subHeading1="Bangalore, KA"
            subHeading2="Email"
            icon1={AiFillHome}
            icon2={HiMail}
            href1="https://www.google.com/maps/place/Bengaluru,+Karnataka/@12.952675,76.4489983,9z/data=!3m1!4b1!4m6!3m5!1s0x3bae1670c9b44e6d:0xf8dfc3e8517e4fe0!8m2!3d12.9715987!4d77.5945627!16zL20vMDljMTc?entry=ttu"
            href2="https://mail.google.com/mail/u/0/#inbox"
          />
        </div>
        <div
          className="
            text-center
            p-3
              text-white
              text-lg
            "
        >
          © 2023 All Rights Reserved. Invoiceapp
        </div>
      </div>
    </footer>
  );
};

export default Footer;
