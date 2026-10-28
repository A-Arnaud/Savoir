Unicode true
!include "MUI2.nsh"
!include "LogicLib.nsh"
Name "Savoir"
OutFile "${OUTPUT}"
InstallDir "$LOCALAPPDATA\Programs\Savoir YouTube"
RequestExecutionLevel user
SetCompressor /SOLID lzma
!define MUI_ABORTWARNING
!define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\Premiers pas.html"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Ouvrir le guide d'activation Chrome / Edge"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "French"
Section "Savoir"
  SetShellVarContext current
  SetOutPath "$INSTDIR"
  File /r "${PAYLOAD}\*.*"
  WriteRegStr HKCU "Software\Google\Chrome\NativeMessagingHosts\com.cypher.youtube" "" "$INSTDIR\com.cypher.youtube.json"
  WriteRegStr HKCU "Software\Microsoft\Edge\NativeMessagingHosts\com.cypher.youtube" "" "$INSTDIR\com.cypher.youtube.json"
  WriteUninstaller "$INSTDIR\Uninstall.exe"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "DisplayName" "Savoir"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "DisplayVersion" "0.2.0"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "UninstallString" '$\"$INSTDIR\Uninstall.exe$\"'
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "NoModify" 1
  WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "NoRepair" 1
  CreateDirectory "$SMPROGRAMS\Savoir YouTube"
  CreateShortcut "$SMPROGRAMS\Savoir YouTube\Premiers pas.lnk" "$INSTDIR\Premiers pas.html"
  ; Retire only the previous Cypher YouTube autostart, with a recoverable copy.
  IfFileExists "$SMSTARTUP\Cypher-YouTube-Autostart.vbs" 0 startup_done
    CreateDirectory "$LOCALAPPDATA\CypherYouTube\migration"
    ClearErrors
    CopyFiles /SILENT "$SMSTARTUP\Cypher-YouTube-Autostart.vbs" "$LOCALAPPDATA\CypherYouTube\migration\"
    IfErrors startup_done
    Delete "$SMSTARTUP\Cypher-YouTube-Autostart.vbs"
  startup_done:
SectionEnd
Section "Uninstall"
  SetShellVarContext current
  ReadRegStr $0 HKCU "Software\Google\Chrome\NativeMessagingHosts\com.cypher.youtube" ""
  ${If} $0 == "$INSTDIR\com.cypher.youtube.json"
    DeleteRegKey HKCU "Software\Google\Chrome\NativeMessagingHosts\com.cypher.youtube"
  ${EndIf}
  ReadRegStr $0 HKCU "Software\Microsoft\Edge\NativeMessagingHosts\com.cypher.youtube" ""
  ${If} $0 == "$INSTDIR\com.cypher.youtube.json"
    DeleteRegKey HKCU "Software\Microsoft\Edge\NativeMessagingHosts\com.cypher.youtube"
  ${EndIf}
  ReadRegStr $0 HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube" "InstallLocation"
  ${If} $0 == "$INSTDIR"
    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\SavoirYouTube"
    Delete "$SMPROGRAMS\Savoir YouTube\Premiers pas.lnk"
    RMDir "$SMPROGRAMS\Savoir YouTube"
  ${EndIf}
  RMDir /r "$INSTDIR\connector"
  RMDir /r "$INSTDIR\extension"
  RMDir /r "$INSTDIR\licenses"
  Delete "$INSTDIR\com.cypher.youtube.json"
  Delete "$INSTDIR\LICENSE.txt"
  Delete "$INSTDIR\Premiers pas.html"
  Delete "$INSTDIR\Uninstall.exe"
  RMDir "$INSTDIR"
  ; %LOCALAPPDATA%\CypherYouTube account/cache data deliberately preserved.
SectionEnd
