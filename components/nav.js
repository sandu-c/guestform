import React from 'react'
import Link from 'next/link'

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }

      fieldset {
        font-family: "Montserrat", "sans-serif"; /* just a custom font */
        width: 300em;                            /* fixed width for the box */
        border-radius: 0.5em;                   /* applied border radius */
        border: 0.1em solid #ccc;               /* custom border style */
        background-color: #ffffff;              /* added a background color */
        box-shadow: 0.08em 0.05em 0.08em #ccc;  /* added a soft box shadow */
      }

      @media only screen and (max-width: 768px) {
        body {
            background-position: right center; /* Show only the right side of the image on mobile */
        }
    }

    `}</style>
  </nav>
)

export default Nav
