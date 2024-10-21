import React from "react";
import getHospital from "@/libs/getHospital";
import { HospitalJson, HospitalItem } from "@/libs/interface";
import Image from "next/image";

export default async function HospitalDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const hospitalData = await getHospital(params.hid);

  const hospital = hospitalData.data;
  if (!hospital) {
    return <div>Hospital not found.</div>;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-32 gap-5">
        <h3 className="text-3xl font-bold">{hospital.name}</h3>
        <div className=" flex flex-row justify-center items-center">
          <div className="p-5 flex flex-row gap-24">
            <Image
              src={hospital.picture}
              alt={hospital.name}
              width={300}
              height={200}
            />

            <div className=" flex flex-col gap-4">
              <p>
                <strong>ที่อยู่:</strong> {hospital.address}
              </p>
              <p>
                <strong>อำเภอ/เขต:</strong> {hospital.district}
              </p>
              <p>
                <strong>จังหวัด:</strong> {hospital.province}
              </p>
              <p>
                <strong>รหัสไปรษณีย์:</strong> {hospital.postalcode}
              </p>
              <p>
                <strong>เบอร์โทรศัพท์:</strong> {hospital.tel}
              </p>
              <p>
                <strong>ID:</strong> {hospital._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// The generateStaticParams function is already commented out in your original code
