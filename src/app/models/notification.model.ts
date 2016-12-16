import { DataItemModel } from './data-item.model';

export class NotificationModel extends DataItemModel<number> {
    id: number;
    title: string;
    message: string;
    noticeType: number;

}