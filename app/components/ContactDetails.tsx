// app/components/ContactDetails.tsx
import type { SerializeFrom } from "@remix-run/node";

/*  same shape you fetch in loader  */
type Contact = {
  phones?: string[];
  emails?: string[];
  officeAddress?: string;
  socialLinks?: string[];
};

type Props = { data: Contact };

export default function ContactDetails({ data }: Props) {
  return (
    <div className="flex flex-col items-center justify-center bg-customColor max-w-[18rem] min-w-[17rem] h-[18rem] rounded-[3rem] mx-auto">
      {/*  PHONES  */}
      {data.phones?.map((p) => (
        <div key={p} className="flex items-center w-[14rem] mb-4">
          <div className="flex justify-center h-10 w-10 items-center rounded-full bg-white">
            <span className="mt-[0.3rem] icon-[icon-park-outline--phone-telephone] text-[#cda274] w-5 h-5"></span>
          </div>
          <a href={`tel:${p.replace(/\s/g, "")}`} className="ml-4 text-sm text-gray-700">
            {p}
          </a>
        </div>
      ))}

      {/*  EMAILS  */}
      {data.emails?.map((e) => (
        <div key={e} className="flex items-center mb-4 w-[14rem]">
          <div className="flex justify-center h-10 w-10 items-center rounded-full bg-white">
            <span className="mt-[0.3rem] icon-[ic--outline-email] text-[#cda274] w-5 h-5"></span>
          </div>
          <a href={`mailto:${e}`} className="ml-4 text-sm text-gray-700">
            {e}
          </a>
        </div>
      ))}

      {/*  ADDRESS  (optional)  */}
      {data.officeAddress && (
        <div className="flex items-center mb-4 w-[14rem]">
          <div className="flex justify-center h-10 w-10 items-center rounded-full bg-white">
            <span className="mt-[0.3rem] icon-[ion--earth-outline] text-[#cda274] w-5 h-5"></span>
          </div>
          <p className="ml-4 text-sm text-gray-700 whitespace-pre-line">{data.officeAddress}</p>
        </div>
      )}

      {/*  SOCIAL  */}
      <div className="flex mt-2 gap-x-6 ml-4 sm:gap-x-4 w-[14rem] mb-4">
        {data.socialLinks?.map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Social profile"
            className="icon-[basil--facebook-solid] w-4 h-4 text-black hover:text-[#cda274]"
          />
        ))}
      </div>
    </div>
  );
}