import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function RouteLoading() {
  return (
    <div className="w-full text-center">
        <FontAwesomeIcon size="lg"
            icon={faSpinner}
            className={`text-cyan-700 animate-spin`}
        /> загрузка страницы
    </div>
  );
}