declare const validators: {
  SettingsV1: (input: unknown) => boolean;
  JobRequest: (input: unknown) => boolean;
  JobSnapshot: (input: unknown) => boolean;
  ExportDocument: (input: unknown) => boolean;
};
export default validators;
