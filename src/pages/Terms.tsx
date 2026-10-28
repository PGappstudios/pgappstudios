import { Link } from 'react-router-dom';
import { LegalPage } from '@/components/kit/LegalPage';

const Terms = () => (
  <LegalPage
    path="/terms"
    title="Terms of Service"
    seoTitle="Terms of Service | PG App Studios"
    description="The terms for using pgappstudios.com and the studio's own tools."
    updated="28 October 2026"
  >
    <p>
      These terms cover pgappstudios.com and the internal tools PG App Studios uses to manage its own accounts. By using this
      website you agree to them. Each of our apps is also covered by the terms shown in the App Store or Google Play, and in
      the app itself.
    </p>

    <h2>Who we are</h2>
    <p>
      PG App Studios is an independent app studio in the Algarve, Portugal, run by Pedro Gregório. Contact:{' '}
      <a href="mailto:pgmetastudios@gmail.com">pgmetastudios@gmail.com</a>.
    </p>

    <h2>Using this website</h2>
    <ul>
      <li>You may read, link to and share pages from this website for personal, non-commercial use.</li>
      <li>The text, images, app icons and screenshots belong to PG App Studios unless marked otherwise. Please don't copy them in bulk or present them as your own.</li>
      <li>Don't try to break, overload or misuse the site.</li>
    </ul>

    <h2>Apps and purchases</h2>
    <p>
      Our apps are downloaded and paid for through the App Store or Google Play. Subscriptions, free trials, renewals and
      refunds are handled by Apple or Google under their terms, and are managed in your Apple or Google account settings.
    </p>

    <h2>Information, not advice</h2>
    <p>
      Articles and guides on this site are general information. Health content is educational and is not medical advice.
      Guides about moving to Portugal are not legal or tax advice, and official rules change, so check them with the
      relevant authority before acting.
    </p>

    <h2>The studio's own tools</h2>
    <p>
      PG HQ, the studio's private dashboard, is used only by PG App Studios to read data from accounts the studio owns, with
      the owner's permission. It is not offered to the public. How it handles data is described in our{' '}
      <Link to="/privacy">Privacy Policy</Link>.
    </p>

    <h2>Liability</h2>
    <p>
      We work to keep this website accurate and available, but it is provided as it is, without guarantees. To the extent
      the law allows, PG App Studios is not liable for losses caused by using it or by relying on its content. Nothing here
      limits rights you have under consumer law.
    </p>

    <h2>Law</h2>
    <p>These terms are governed by Portuguese law, and the courts of Portugal have jurisdiction, without affecting your rights as a consumer.</p>

    <h2>Changes</h2>
    <p>If these terms change, the new version will be posted on this page with a new date.</p>
  </LegalPage>
);

export default Terms;
