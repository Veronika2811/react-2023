import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import MainWrapper from '@/components/MainWrapper/MainWrapper';

export default function Details() {
  return (
    <ErrorBoundary>
      <Header />
      <MainWrapper />
    </ErrorBoundary>
  );
}
