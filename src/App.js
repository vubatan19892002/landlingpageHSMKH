import logo129 from "./logo129.png";
import "./App.css";
import { version } from "pdfjs-dist";
import { Document, Page, pdfjs } from "react-pdf";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useState } from "react";
function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState("");

  const allowedFiles = ["application/pdf"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();

        reader.readAsDataURL(selectedFile);

        reader.onload = (e) => {
          // setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfFile(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfFile != null) {
      setViewPdf(pdfFile);
    } else {
      setPdfFile(null);
    }
  };
  const newplugin = defaultLayoutPlugin();
  return (
    <>
      <div className="containers">
        <div className="row align-items-start h-100 container__nav">
          <nav className="col-2 h-100  ">
            <img src={logo129} className="img-thumbnail" />

            <div className="nav nav-pills flex-column flex-sm-row">
              <a
                className="flex-sm-fill text-sm-center nav-link active"
                aria-current="page"
                href="#"
              >
                Ký văn bản
              </a>
            </div>
          </nav>

          <div className="col-7 h-100 main">
            <form onSubmit={handleSubmit}>
              <input type="file" className="main-input" onChange={handleFile} />
              <button type="submit" class="btn btn-primary">
                Xem bản ghi
              </button>
            </form>
            <div className="viewer">
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`}
              >
                {viewPdf && <Viewer fileUrl={viewPdf} plugins={[newplugin]} />}
                {/* {!viewPdf && <>No PDF</>} */}
              </Worker>
            </div>
          </div>
          <div className="col-3 h-100 cardbox">
            <div className="card-body">
              <div className="text pt-5 pb-3">Chọn mẫu chữ kí</div>
              <select className="form-select ">
                <option selected>Chọn chữ kí</option>
                <option value="1">Chũ kí hình ảnh</option>
                <option value="2">Chữ kí thông tin</option>
                <option value="3">Chữ kí hình ảnh và thông tins</option>
              </select>
              <div className="text pt-3 pb-3">Hình ảnh chữ kí</div>
              <div className="borderbox"></div>
              <div className="pt-5 pb-3 d-flex flex-row justify-content-around ">
                <button type="button" className="btn btn-primary">
                  Ký văn bản
                </button>
                <button type="button" className="btn btn-primary">
                  Tải văn bản
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
