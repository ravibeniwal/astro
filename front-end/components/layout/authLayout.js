import Head from "next/head";
import PropTypes from "prop-types";

/**
 * @AuthLayout This is the Auth layout functional component.
 */
export default function AuthLayout({
  children,
  title = "This is the default title",
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          type="text/javascript"
        ></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic%7CMontserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic%7CLora:regular,700"
          media="all"
        />
      </Head>
      {children}
    </div>
  );
}

AuthLayout.propTypes = {
  /**
   * @children paramType {element}- is the element which render the child component
   */
  children: PropTypes.element.isRequired,
  /**
   * @title paramType {string}- is the string which shows the title of the page
   */
  title: PropTypes.string,
};
