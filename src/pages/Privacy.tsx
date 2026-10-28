import { LegalPage } from '@/components/kit/LegalPage';

const Privacy = () => (
  <LegalPage
    path="/privacy"
    title="Privacy Policy"
    seoTitle="Privacy Policy | PG App Studios"
    description="How PG App Studios handles data on pgappstudios.com and in the studio's own tools."
    updated="28 October 2026"
  >
    <p>
      PG App Studios is an independent app studio in the Algarve, Portugal, run by Pedro Gregório. This policy covers this
      website and the internal tools the studio uses to run its own accounts. Each of our apps has its own privacy policy,
      linked from its App Store or Google Play listing, and that policy is the one that applies inside the app.
    </p>

    <h2>Who is responsible</h2>
    <p>
      PG App Studios, Algarve, Portugal. Contact: <a href="mailto:pgmetastudios@gmail.com">pgmetastudios@gmail.com</a>.
    </p>

    <h2>This website</h2>
    <p>
      You can read everything on this website without an account. We do not ask for your name, email or any other personal
      details, and we do not sell or rent data to anyone.
    </p>
    <ul>
      <li>
        <strong>Analytics.</strong> We use Google Analytics 4 to count visits, see which pages are read and which App Store
        or Google Play links are clicked. Google sets cookies to do this and receives technical data such as your IP address,
        browser and device type. You can block it with your browser settings, a content blocker or Google's opt-out add-on.
      </li>
      <li>
        <strong>Hosting.</strong> The site is hosted by Vercel, which keeps standard server logs (IP address, time, page
        requested) to deliver and protect the site.
      </li>
      <li>
        <strong>Email.</strong> If you email us, we use your message and address only to reply to you.
      </li>
    </ul>

    <h2>The studio's own tools</h2>
    <p>
      The studio uses a private dashboard, PG HQ, to see how its own social media accounts and apps are doing. It connects
      only to accounts the studio owns, on platforms such as TikTok, Instagram and Facebook, after the studio's owner signs
      in and approves the access. It reads profile details, follower counts and the results of the studio's own posts and
      videos.
    </p>
    <ul>
      <li>This data stays on the studio's own computer and is not shared, sold or used for advertising.</li>
      <li>It does not collect data about other people's accounts.</li>
      <li>Access tokens are kept in the computer's secure keychain, and access can be removed at any time in the platform's settings.</li>
    </ul>

    <h2>How long we keep data</h2>
    <p>
      Analytics data is kept for the period set in Google Analytics (14 months). Emails are kept as long as needed to answer
      you. Data in the studio's own tools is kept while the studio uses them and deleted when no longer needed.
    </p>

    <h2>Your rights</h2>
    <p>
      Under the GDPR you can ask to see, correct or delete personal data we hold about you, object to its use, or complain
      to the Portuguese data protection authority (CNPD, cnpd.pt). Email us and we will reply within 30 days.
    </p>

    <h2>Changes</h2>
    <p>If this policy changes, the new version will be posted on this page with a new date.</p>
  </LegalPage>
);

export default Privacy;
