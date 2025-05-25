import { useState, useRef } from "react"
import { Upload, Music, FileMusic, X, AlertCircle, CheckCircle2 } from "lucide-react"
import styles from "./Convert.module.css"

export default function Convert() {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      validateAndSetFile(selectedFile)
    }
  }

  const validateAndSetFile = (selectedFile) => {
    // 파일 유형 검증
    const validTypes = ["audio/mpeg", "audio/wav", "audio/x-m4a"]
    if (!validTypes.includes(selectedFile.type)) {
      setError("지원되지 않는 파일 형식입니다. MP3, WAV, M4A 파일만 지원합니다.")
      return
    }

    // 파일 크기 검증 (50MB 제한)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("파일 크기가 너무 큽니다. 최대 50MB까지 지원합니다.")
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setResult(null)
    setError(null)
  }

  const handleConvert = async () => {
    if (!file) return

    setIsConverting(true)
    setProgress(0)
    setError(null)

    // 진행 상황 시뮬레이션
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 200)

    try {
      // 실제 변환 로직은 여기에 구현
      // const formData = new FormData();
      // formData.append("audio", file);
      // const response = await fetch("/api/convert", {
      //   method: "POST",
      //   body: formData,
      // });

      // 변환 완료 시뮬레이션
      setTimeout(() => {
        clearInterval(interval)
        setProgress(100)
        setIsConverting(false)

        // 변환 결과 설정 (실제로는 서버 응답에서 받아옴)
        setResult({
          midi: "/sample-midi.mid",
          sheet: "/sample-sheet.pdf",
        })
      }, 4000)
    } catch (err) {
      clearInterval(interval)
      setError("변환 중 오류가 발생했습니다. 다시 시도해주세요.")
      setIsConverting(false)
    }
  }

  const handleDownload = (type) => {
    // 실제 다운로드 로직은 여기에 구현
    console.log(`Downloading ${type}...`)

    // 예시: 다운로드 링크 생성
    const link = document.createElement("a")
    link.href = type === "midi" ? result.midi : result.sheet
    link.download = type === "midi" ? "converted.mid" : "sheet_music.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>음성 파일 변환</h1>
        <p className={styles.subtitle}>녹음된 음성 파일을 업로드하면 MIDI 파일과 악보로 변환해 드립니다.</p>

        <div className={styles.uploadSection}>
          <div
            className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              style={{ display: "none" }}
            />
            <Upload className={styles.uploadIcon} />
            <p className={styles.uploadText}>{file ? file.name : "클릭하여 파일 선택 또는 드래그 앤 드롭"}</p>
            <p className={styles.uploadHint}>MP3, WAV, M4A 형식의 음성 파일을 지원합니다. (최대 50MB)</p>
          </div>

          {file && (
            <div className={styles.fileInfo}>
              <div className={styles.fileName}>
                <FileMusic className={styles.fileIcon} />
                {file.name}
              </div>
              <button className={styles.removeButton} onClick={handleRemoveFile}>
                <X size={18} />
              </button>
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle className={styles.errorIcon} size={18} />
              {error}
            </div>
          )}

          <button className={styles.convertButton} onClick={handleConvert} disabled={!file || isConverting}>
            {isConverting ? "변환 중..." : "변환 시작"}
          </button>

          {isConverting && (
            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                <span>변환 중...</span>
                <span className={styles.progressStatus}>{progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className={styles.resultSection}>
            <h2 className={styles.resultTitle}>
              <CheckCircle2 className={styles.resultIcon} />
              변환 완료!
            </h2>
            <div className={styles.downloadButtons}>
              <button
                className={`${styles.downloadButton} ${styles.midiButton}`}
                onClick={() => handleDownload("midi")}
              >
                <FileMusic className={styles.downloadIcon} />
                MIDI 파일 다운로드
              </button>
              <button
                className={`${styles.downloadButton} ${styles.sheetButton}`}
                onClick={() => handleDownload("sheet")}
              >
                <Music className={styles.downloadIcon} />
                악보 다운로드
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
