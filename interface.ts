interface HospitalItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface HospitalJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: HospitalItem[];
}
interface BookingItem {
  name: string; // ชื่อ ของผู้จองวัคซีน
  surname: string; // นามสกุล ของผู้จองวัคซีน
  id: string; // รหัสประจำตัวประชาชน ของผู้จองวัคซีน
  hospital: string; // โรงพยาบาล ที่ต้องการรับวัคซีน
  bookDate: string; // วันที่ต้องการรับวัคซีน
}
