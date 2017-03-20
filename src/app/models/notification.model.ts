import { BaseDataTableModel } from './base-data-table.model';

export class NotificationModel extends BaseDataTableModel {
    //id: number;
    title: string;
    message: string;
    noticeType: number;
    constructor(id?: number) {
        super(id);
    }

}