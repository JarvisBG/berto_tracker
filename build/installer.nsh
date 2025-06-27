!define APP_NAME "BERTO Tracker"
!define APP_VERSION "1.0.0"

Name "${APP_NAME} ${APP_VERSION}"
OutFile "BERTOTracker-Setup.exe"

Section
  SetOutPath "$INSTDIR"
  File /r "dist\*.*"
  CreateShortcut "$DESKTOP\${APP_NAME}.lnk" "$INSTDIR\BERTOTracker.exe"
SectionEnd