export interface Marker {
    user: string;
    _id?: string;
    label: string;
    reportType: ReportType;
    itemType: ItemType;
    reportTime: string;
    reportDate: string;
    coordinates: Coordinates;
    place?: string;
    description: string;
    title: string;
    reward: 0;
    isEvent?: boolean;
    event?: any;
    image?: string;
}

export enum ReportType {
    ALL = "all",
    LOST = "lost",
    FOUND = "found",
}

export enum ItemType {
    PET = "Pet",
    ART = 'Art',
    ACCESSORIES = "Accessories",
    LUGGAGE = "Luggage",
    BACKPACK = "Backpack",
    CLOTHINGS = "Clothings",
    COLLECTOR_ITEMS = "Collector Items",
    CELLPHONE = "Cellphone",
    DOCUMENTS = "Documents",
    ELECTRONICS = "Electronics",
    FOOTWEAR = "Footwear",
    HOUSEHOLD = "Household",
    JEWELRY = "Jewelry",
    KEYS = "Keys",
    MONEY = "Money",
    MAIL = "Mail",
    MEDICAL = "Medical",
    OTHER = "Other",
    SUNGLASSES = "Sunglasses",
    GLASSES = "Glasses",
    TICKETS = "Tickets",
    TOYS = "Toys",
    WALLET = "Wallet",
    WATCH = "Watch",
    CREDIT_CARD = "Credit Card",
    BICYCLE = "Bicycle",
}

export interface Coordinates {
    lat: number;
    lng: number;
}