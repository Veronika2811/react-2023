import { useRouter } from 'next/router';

import Button from '@/components/UI/button/Button';

export default function Custom404() {
  const router = useRouter();

  const goToTheMainPage = () => router.push({ pathname: '/' });

  return (
    <div className="error__wrapper">
      <h2>Sorry, but we couldn&apos;t find anything matching your request.</h2>
      <Button
        type="button"
        data-testid="nothing-found-button"
        onClick={goToTheMainPage}
      >
        Main Page
      </Button>
    </div>
  );
}
