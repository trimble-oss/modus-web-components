import { ModusTableBadgeType } from '../enums';
import { ModusTableBadgeColor } from '../enums/modus-table-badge-color';

export interface ModusTableBadge {
  color?: ModusTableBadgeColor;
  text: string;
  type?: ModusTableBadgeType;
  _type: 'badge';
}
