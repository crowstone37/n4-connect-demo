export interface FlowComponent {
    type: string;
    label: string;
    icon?: string;
    category?: string;

    requiredExits?: number;
}
