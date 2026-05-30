// Public barrel: a tool module exposes only its default-exported entry component.
// Reference template — copy this shape for new tools.
//
// Convention: imports *within* a module are RELATIVE (./ui, ../domain). The
// `@/modules/<tool>/...` alias is lint-banned past this barrel, including a
// module importing itself. Outside code reaches a tool only through this file.
export { default } from "./ui/base64-tool";
