import Axios from "../../baseUrl";

const ExportService = {
  get() {
    return Axios.get('export');
  },
};
export default ExportService;
