export type InquiryStatus = "Pending" | "Approved" | "Rejected";

export interface RentalInquiry {
  id: number;
  listingId: number;
  listingTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  occupation: string;
  moveInDate: string;
  appliedOn: string;
  message: string;
  status: InquiryStatus;
}
