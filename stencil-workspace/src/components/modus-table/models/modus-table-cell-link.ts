import { ModusTableColumnDataType } from "../enums";

export default interface ModusTableCellLink {
  display: string;
  url: string;
  _type?: ModusTableColumnDataType.Link
}
