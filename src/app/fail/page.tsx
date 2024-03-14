"use client";

import { useSearchParams } from "next/navigation";

export default function FailPage() {
  const searchParamsams = useSearchParams();

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${searchParamsams.get("code")}`}</p>
        <p>{`실패 사유: ${searchParamsams.get("message")}`}</p>
      </div>
    </div>
  );
}
