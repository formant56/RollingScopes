import { useEffect, useState } from 'react';

export default function ErrorTriggerButton(): JSX.Element {
  const [isError, setIsError] = useState(false);
  function explode(): void {
    setIsError(true);
  }
  useEffect(() => {
    if (isError) throw new Error('BOOM! A controlled error has occurred.');
  }, [isError]);

  return (
    <button onClick={explode} className="error-button">
      Crash the App!
    </button>
  );
}
