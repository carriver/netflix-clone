import './DemoNotice.css';

export const DEMO_EMAIL = 'user@example.com';
export const DEMO_PASSWORD = '123456';

function DemoNotice() {
  return (
    <aside className='demoNotice' role='note'>
      <strong>Portfolio demo by Carlos Rivera.</strong> Not affiliated with Netflix. Sign in
      with the demo account <code>{DEMO_EMAIL}</code> / <code>{DEMO_PASSWORD}</code> and never
      use a real password.
    </aside>
  );
}

export default DemoNotice;
