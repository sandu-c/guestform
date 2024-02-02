import { useRouter } from 'next/router';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS

function DownloadPage() {
  const router = useRouter();
  const { i } = router.query;

  const handleDownload = () => {
    // Fetch the file based on the parameter value
    const url = `https://example.com/download?parameter=${i}`;

    // Perform the download
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box">
            <h1 className="title">Download Page</h1>
            <p>Parameter value: {i}</p>
            <button className="button is-primary is-large" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;
