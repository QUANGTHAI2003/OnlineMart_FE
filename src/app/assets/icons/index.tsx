import { MouseEvent } from "react";

export const RatingStar = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    color="#fdd836"
    height="14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: "rgb(253, 216, 54)" }}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
  </svg>
);
export const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => {
  const color = filled ? "text-yellow-400" : "text-gray-300";
  return (
    <svg
      className={`w-4 h-4 ${color}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
};
export const AccountUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
  </svg>
);

export const AccountBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
  </svg>
);

export const AccountOrder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
    <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
  </svg>
);

export const AccountAdress = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
  </svg>
);

export const AccountHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
  </svg>
);

export const AccountStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
    <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
  </svg>
);

export const AccountDiscount = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
    <path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64H64V352zm64-208c0 35.3-28.7 64-64 64V144h64zM512 304v64H448c0-35.3 28.7-64 64-64zM448 96h64v64c-35.3 0-64-28.7-64-64z" />
  </svg>
);

// Icon UserProfile
export const ProfilePhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
  </svg>
);

export const DiscountItemFrame = () => (
  <svg width="450" height="132" viewBox="0 0 450 132" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2299_10859)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M442.477 0C446.631 0 450 3.582 450 8V124C450 128.418 446.631 132 442.477 132H132.132C132.132 127.581 128.763 124 124.608 124C120.453 124 117.085 127.581 117.085 132H7.52351C3.36865 132 0 128.418 0 124V8C0 3.582 3.36865 0 7.52351 0H117.085C117.085 4.418 120.453 8 124.608 8C128.763 8 132.132 4.418 132.132 0H368.652H442.477Z"
        fill="#FFFFFF"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M124.608 11V125V11Z" fill="#FFFFFF" />
      <path d="M124.608 11V125" stroke="#EEEEEE" strokeLinecap="square" strokeDasharray="2 4" />
    </g>
    <defs>
      <clipPath id="clip0_2299_10859">
        <rect width="450" height="132" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
// Icon Facebook
export const IconFacebook = () => (
  <svg className="fill-[#4893f4]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
  </svg>
);

interface ICopyIconProps {
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
  className?: string;
}

export const CopyIcon: React.FC<ICopyIconProps> = ({ onClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    onClick={onClick}
    className={className}
  >
    <path
      d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
      stroke="#0B74E5"
      strokeWidth="1.5"
    />
    <path
      d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
      stroke="#0B74E5"
      strokeWidth="1.5"
    />
  </svg>
);

// export const PlusIcon = () => (
//   <svg
//     stroke="currentColor"
//     fill="#787878"
//     strokeWidth="0"
//     viewBox="0 0 24 24"
//     height="1.5em"
//     width="1.5em"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
//   </svg>
// );

// export const CheckIcon = () => (
//   <svg
//     className="ml-3"
//     stroke="currentColor"
//     fill="#26bc4e"
//     strokeWidth="0"
//     viewBox="0 0 512 512"
//     height="0.75em"
//     width="0.75em"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
//   </svg>
// );

export const CouponStoreBackground = () => (
  <img
    className="coupon-background"
    src="https://salt.tikicdn.com/ts/tmp/8f/e7/08/a2fc787e1b422b381f1112508a864aef.png"
    alt="coupon-background"
  />
);

export const CouponStoreSaved = () => (
  <img
    className="save-stamp"
    src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2272%22%20height%3D%2256%22%20viewBox%3D%220%200%2072%2056%22%3E%20%20%20%20%3Cdefs%3E%20%20%20%20%20%20%20%20%3Cpath%20id%3D%228kgtgvd4ba%22%20d%3D%22M0%200H72V56H0z%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20id%3D%22fz8b8bxfzc%22%20d%3D%22M31%2050.4c-7.554%200-14.264-3.61-18.5-9.2h1.53c4.034%204.886%2010.138%208%2016.97%208%206.832%200%2012.936-3.114%2016.97-8h1.53c-4.236%205.59-10.946%209.2-18.5%209.2zM31%204c7.554%200%2014.265%203.61%2018.501%209.2h-1.53c-4.034-4.886-10.139-8-16.971-8-6.832%200-12.937%203.114-16.972%208h-1.53C16.736%207.61%2023.447%204%2031%204z%22%2F%3E%20%20%20%20%3C%2Fdefs%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20transform%3D%22translate%28-3252%20-2553%29%20translate%283200%2080%29%20translate%2852%202285%29%20translate%280%20140%29%20translate%280%2048%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cmask%20id%3D%22aw0ice0jqb%22%20fill%3D%22%23fff%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%238kgtgvd4ba%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fmask%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20mask%3D%22url%28%23aw0ice0jqb%29%22%20opacity%3D%22.6%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20transform%3D%22translate%286%201%29%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cg%20fill%3D%22%23017FFF%22%20fill-rule%3D%22nonzero%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M13.792%2015.51c2.114%200%203.36-1.313%203.36-3.549%200-2.236-1.246-3.496-3.36-3.496h-2.69v2.925h-.572v1.084h.571v3.037h2.69zm-.176-1.22h-1.04v-1.816h1.284V11.39h-1.284V9.68h1.04c1.299%200%202.031.811%202.031%202.286%200%201.523-.712%202.324-2.03%202.324zm7.993-6.43c.64%200%201.09-.498%201.099-1.377h-.767c0%20.39-.127.586-.38.586-.347%200-.523-.625-1.24-.625-.636%200-1.09.473-1.09%201.372h.767c0-.406.146-.581.371-.581.347%200%20.527.625%201.24.625zm-2.441%207.65l.537-1.708h2.476l.537%201.709h1.567l-2.451-7.046H20.1l-2.447%207.046h1.514zm2.695-2.812h-1.84l.903-2.885h.034l.903%202.885zm9.673%202.813v-1.22h-3.081V8.464H26.98v7.046h4.556zm3.828.122c1.782%200%202.95-1.035%202.95-2.612V9.407h.463c.689%200%201.109-.38%201.109-1.04V7.2h-1.128v.889c0%20.25-.137.376-.39.376h-1.53v4.414c0%20.928-.556%201.49-1.474%201.49-.918%200-1.48-.562-1.48-1.49V8.465H32.41v4.556c0%201.577%201.172%202.612%202.954%202.612zm8.17%200c1.8%200%202.948-1.06%202.948-2.612V8.465h-1.474v4.41c0%20.903-.532%201.493-1.475%201.493-.947%200-1.48-.59-1.48-1.494V8.465H40.58v4.556c0%201.552%201.147%202.612%202.954%202.612z%22%20transform%3D%22rotate%28-15%2090.766%2011.604%29%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M54.362.99H3.482c-.73%200-1.095.086-1.475.335-.348.228-.625.566-.811.992-.186.426-.261.837-.272%201.592L.922%2018.856c0%20.895.07%201.341.274%201.806.186.427.463.765.81.993.38.248.746.335%201.477.335h50.879c.731%200%201.096-.087%201.476-.335.348-.228.624-.566.81-.993.204-.465.274-.911.274-1.806V4.124c0-.895-.07-1.342-.273-1.807-.187-.426-.463-.764-.811-.992-.38-.249-.745-.335-1.476-.335zM3.36%201.99l50.975-.001c.584%200%20.797.051%201.017.198.178.12.316.292.412.515.117.275.158.542.158%201.272v15.03l-.004.355c-.013.472-.058.692-.154.916-.096.224-.234.396-.412.515-.22.147-.433.199-1.017.199H3.51l-.284-.006c-.378-.016-.553-.072-.733-.193-.179-.12-.316-.291-.412-.515-.107-.25-.15-.493-.158-1.083V3.975c0-.73.04-.997.158-1.272.096-.223.233-.395.412-.515.2-.133.394-.188.867-.197z%22%20transform%3D%22rotate%28-15%2090.766%2011.604%29%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20fill%3D%22%23017FFF%22%20fill-rule%3D%22nonzero%22%20transform%3D%22rotate%28-15%2031%2027.2%29%22%20xlink%3Ahref%3D%22%23fz8b8bxfzc%22%2F%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%20%20%20%20%3C%2Fg%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E"
    alt="saved-stamp"
  />
);

export const IconNext = () => (
  <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#808089"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6.35355 5.64645C6.54882 5.84171 6.54882 6.15829 6.35355 6.35355L1.35355 11.3536C1.15829 11.5488 0.841709 11.5488 0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464L5.29289 6L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
    ></path>
  </svg>
);

export const IconCheck = () => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.8036 4.34615C13.9988 4.54142 13.9988 4.858 13.8036 5.05326L6.47401 12.3828C6.38024 12.4766 6.25307 12.5292 6.12046 12.5292C5.98785 12.5292 5.86067 12.4766 5.7669 12.3828L2.14645 8.76234C1.95118 8.56708 1.95118 8.2505 2.14645 8.05524C2.34171 7.85998 2.65829 7.85998 2.85355 8.05524L6.12046 11.3221L13.0964 4.34615C13.2917 4.15089 13.6083 4.15089 13.8036 4.34615Z"
      fill="#00AB56"
    ></path>
  </svg>
);

export const IconThank = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask-thumb-up-0"
      maskUnits="userSpaceOnUse"
      x="2"
      y="2"
      width="16"
      height="16"
      style={{ maskType: "alpha" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.125 2.5C7.84316 2.5 7.59618 2.68864 7.52202 2.96055L5.77263 9.375H3.125C2.77982 9.375 2.5 9.65482 2.5 10V16.875C2.5 17.2202 2.77982 17.5 3.125 17.5H14.0169C14.6136 17.4994 15.1905 17.2853 15.6432 16.8965C16.0958 16.5077 16.3945 15.9698 16.4852 15.38L17.1584 11.005C17.2131 10.6488 17.1903 10.2849 17.0913 9.93833C16.9923 9.59177 16.8195 9.27071 16.5848 8.99716C16.3501 8.72361 16.0591 8.50405 15.7316 8.35351C15.4041 8.20297 15.0479 8.12502 14.6875 8.125H10.625V5C10.625 4.33696 10.3616 3.70107 9.89277 3.23223C9.42393 2.76339 8.78804 2.5 8.125 2.5ZM5.625 16.25V10.625H3.75V16.25H5.625ZM6.875 10.0837L8.57908 3.83539C8.73871 3.89763 8.88539 3.99262 9.00888 4.11612C9.2433 4.35054 9.375 4.66848 9.375 5V8.75C9.375 9.09518 9.65482 9.375 10 9.375H14.6875C14.8677 9.37501 15.0458 9.41399 15.2095 9.48925C15.3732 9.56452 15.5188 9.67431 15.6361 9.81108C15.7535 9.94786 15.8398 10.1084 15.8893 10.2817C15.9388 10.4549 15.9503 10.6369 15.9229 10.815L15.2498 15.19C15.2044 15.4849 15.0551 15.7539 14.8287 15.9483C14.6024 16.1427 14.314 16.2497 14.0156 16.25H6.875V10.0837Z"
        fill="#38383D"
      ></path>
    </mask>
    <g mask="url(#mask-thumb-up-0)">
      <rect x="2.5" y="2.5" width="15" height="15" fill="#0B74E5"></rect>
    </g>
  </svg>
);

export const ImageLoadingSkeleton = () => (
  <svg
    className="w-10 h-10 text-gray-200 dark:text-gray-600"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 18"
  >
    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
  </svg>
);

export const AvatarImage = () => (
  <svg
    className="w-10 h-10 text-gray-200 dark:text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
  </svg>
);

export const StarImage = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // eslint-disable-next-line react/no-unknown-property
    // xlink="http://www.w3.org/1999/xlink"
    width="64"
    height="64"
    viewBox="0 0 80 80"
  >
    <defs>
      <path
        id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-a"
        d="M43.716 5.432l2.859 10.239a7.29 7.29 0 004.228 4.796l9.682 3.99c5.349 2.204 6.112 9.605 1.327 12.87l-8.661 5.913a7.327 7.327 0 00-3.158 5.57l-.708 10.613c-.39 5.86-7.057 8.872-11.592 5.235l-8.212-6.585a7.085 7.085 0 00-6.18-1.354l-10.12 2.57c-5.59 1.418-10.473-4.122-8.492-9.635l3.585-9.982a7.441 7.441 0 00-.66-6.407L2.067 24.24c-3.064-4.985.584-11.419 6.344-11.189l10.428.415a7.106 7.106 0 005.772-2.606l6.692-8.147C35-1.787 42.136-.223 43.716 5.433z"
      ></path>
      <path
        id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-c"
        d="M28.34 5.431l2.86 10.24c.608 2.176 2.168 3.947 4.227 4.796l9.683 3.99c5.348 2.204 6.111 9.604 1.328 12.87l-8.662 5.913a7.326 7.326 0 00-3.158 5.57l-.709 10.613c-.026.39-.08.766-.159 1.13C12.394 55.609-1.723 35.19.251 13.338l3.213.127a7.1 7.1 0 005.77-2.606l6.694-8.147c3.696-4.499 10.834-2.935 12.412 2.72z"
      ></path>
      <path
        id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-e"
        d="M29.628 11.393c.658-3.136 3.67-5.132 6.73-4.458 3.06.673 5.007 3.761 4.35 6.897-.657 3.135-3.67 5.132-6.73 4.458-3.06-.674-5.007-3.761-4.35-6.897zM7.276.53c3.059.674 5.006 3.762 4.349 6.898-.657 3.135-3.67 5.132-6.729 4.457-3.06-.674-5.007-3.762-4.35-6.897.657-3.136 3.67-5.131 6.73-4.458z"
      ></path>
      <path
        id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-g"
        d="M.75 8.56c.165-.784.919-1.283 1.683-1.114l3.957.87c.765.169 1.252.942 1.087 1.725-.164.784-.917 1.283-1.682 1.114l-.499-.11c-.422 5.407 3.124 10.446 8.436 11.616 5.311 1.17 10.564-1.932 12.346-7.04l-.5-.11c-.764-.168-1.251-.94-1.086-1.724.163-.784.917-1.283 1.682-1.114l3.957.871c.765.169 1.252.94 1.087 1.724-.164.784-.918 1.283-1.682 1.114l-.666-.146c-2.126 6.674-8.892 10.77-15.734 9.264-6.84-1.506-11.369-8.09-10.633-15.069l-.665-.147C1.074 10.116.587 9.344.75 8.56zm21.025-4.917c.164-.783.917-1.282 1.683-1.114l.276.06c.765.17 1.252.941 1.087 1.725-.164.784-.917 1.283-1.682 1.114l-.277-.06c-.764-.169-1.251-.94-1.087-1.725zM12.655.15l.277.061c.765.168 1.252.941 1.087 1.724-.164.785-.917 1.284-1.682 1.115l-.278-.06c-.764-.17-1.25-.941-1.087-1.725.165-.785.918-1.283 1.683-1.115z"
      ></path>
    </defs>
    <g fill="none" fillRule="evenodd" opacity="0.997">
      <g transform="rotate(-12 67.32 3.796)">
        <mask id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-b" fill="#fff">
          <use xlinkHref="#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-a"></use>
        </mask>
        <path
          fill="#C7C7C7"
          d="M-6.732-7.793h79.409v81.922H-6.732z"
          mask="url(#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-b)"
        ></path>
      </g>
      <g transform="rotate(-12 59.633 -69.346)">
        <mask id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-d" fill="#fff">
          <use xlinkHref="#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-c"></use>
        </mask>
        <path
          fill="#E0E0E0"
          d="M-7.62-7.793h64.921v76.236H-7.62z"
          mask="url(#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-d)"
        ></path>
      </g>
      <g transform="rotate(-12 159.533 -57.659)">
        <mask id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-f" fill="#fff">
          <use xlinkHref="#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-e"></use>
        </mask>
        <path
          fill="#C7C7C7"
          d="M-7.269-7.49h55.792v33.801H-7.269z"
          mask="url(#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-f)"
        ></path>
      </g>
      <g transform="rotate(-12 162.44 -80.152)">
        <mask id="30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-h" fill="#fff">
          <use xlinkHref="#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-g"></use>
        </mask>
        <path
          fill="#000"
          fillOpacity="0.54"
          d="M-6.969-7.773h45.907v41.475H-6.969z"
          mask="url(#30b7646d-4fa9-42fd-b8bf-ce234a1d7f82-h)"
        ></path>
      </g>
    </g>
  </svg>
);

export const PlusIcon = () => (
  <svg
    stroke="currentColor"
    fill="#787878"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1.5em"
    width="1.5em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
  </svg>
);

export const CheckIcon = () => (
  <svg
    className="ml-3"
    stroke="currentColor"
    fill="#26bc4e"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="0.75em"
    width="0.75em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
  </svg>
);

export const LinkArrow = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="link__arrow"
    height="20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
  </svg>
);

export const flashIcon = () => {
  if (screen.width < 1024) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="89" height="28" viewBox="0 0 89 28">
        <defs>
          <linearGradient id="prefix__a" x1="0%" x2="98.078%" y1="46.989%" y2="53.011%">
            <stop offset="0%" stopColor="#FF821D" />
            <stop offset="100%" stopColor="#FF5B18" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0H88.667V28H0z" />
          <path
            fill="url(#prefix__a)"
            d="M8.377 22.562c2.56 0 4.798-.746 6.513-1.74l2.486-8.775h-7.98l-.92 3.53h3.356l-.696 2.337c-.596.273-1.342.472-2.311.472-2.138 0-3.903-1.268-3.903-3.704 0-3.206 2.411-5.916 5.916-5.916 1.864 0 3.281.77 4.3 1.79l3.232-3.132c-1.193-1.541-3.729-2.958-7.209-2.958C4.524 4.466 0 9.338 0 14.88c0 5.344 4.226 7.681 8.377 7.681zM24.808 7.548l.945-3.48H20.83l-.945 3.48h4.922zm-4.052 14.666l3.605-13.448h-4.723l-3.605 13.448h4.723zM33.981 7.498l4.499-3.157-4.3-1.417-3.829 4.574h3.63zm41.297-1.462l4.5-3.157-4.301-1.417-3.828 4.574h3.63zM26.474 22.488c1.566 0 2.734-.647 3.877-1.716l-.373 1.442h4.649l1.989-7.408c.174-.67.273-1.317.273-1.938 0-2.685-1.964-4.276-5.99-4.276-1.94 0-3.879.323-5.295.82l.67 3.43c.945-.372 2.362-.67 3.63-.67 1.64 0 2.312.571 2.312 1.441 0 .323-.075.597-.125.82l-.05.175c-1.068-.324-2.187-.522-3.405-.522-3.555 0-5.916 1.79-5.916 4.747 0 2.238 1.541 3.655 3.754 3.655zm2.187-2.909c-.795 0-1.342-.472-1.342-1.243 0-1.218.97-1.939 2.46-1.939.647 0 1.244.125 1.766.299l-.125.447c-.373 1.367-1.541 2.436-2.759 2.436zm20.781 2.933c4.325 0 7.408-2.436 7.408-6.015 0-2.61-1.84-3.828-4.524-4.847-2.387-.945-2.909-1.194-2.909-1.89s.721-1.243 1.89-1.243c1.764 0 3.28.771 4.598 1.914l2.983-3.33c-1.665-1.591-4.077-2.586-7.134-2.586-4.25 0-7.383 2.461-7.383 5.916 0 2.56 1.765 3.754 4.524 4.798 2.436.945 2.909 1.293 2.909 1.964 0 .795-.82 1.292-1.964 1.292-1.914 0-3.68-.795-5.37-2.361l-3.107 3.207c1.865 2.013 4.674 3.181 8.08 3.181zM64.755 7.498l2.485-1.516 1.69 1.516h2.81L69.65 3.422h-3.828l-4.275 4.076h3.207zm-.697 15.04c4.525 0 7.93-3.754 7.93-7.831 0-3.53-2.486-6.24-6.612-6.24-4.5 0-7.905 3.754-7.905 7.806 0 3.555 2.486 6.264 6.587 6.264zm.274-3.928c-1.392 0-2.337-.97-2.337-2.51 0-1.741 1.268-3.705 3.132-3.705 1.392 0 2.337.97 2.337 2.486 0 1.765-1.268 3.729-3.132 3.729zm14.144 3.927c2.685 0 4.375-1.044 5.742-2.635l-2.883-2.51c-.82.82-1.542 1.243-2.536 1.243-1.168 0-2.063-.87-2.063-2.238 0-2.038 1.442-4.002 3.231-4.002 1.219 0 1.865.647 2.312 1.69l3.704-1.913c-.72-2.064-2.585-3.68-5.717-3.68-4.475 0-8.079 3.63-8.079 8.154 0 3.63 2.66 5.891 6.289 5.891z"
          />
        </g>
      </svg>
    );
  }

  return (
    <path
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.50784 12.141C5.88561 12.141 7.08948 11.7397 8.01245 11.2047L9.35009 6.48283H5.05627L4.56135 8.38227H6.36716L5.99262 9.63965C5.67159 9.78679 5.27029 9.89381 4.74862 9.89381C3.59825 9.89381 2.64852 9.21161 2.64852 7.90072C2.64852 6.17517 3.94603 4.71715 5.8321 4.71715C6.83533 4.71715 7.59779 5.13181 8.14622 5.68024L9.88515 3.99482C9.24308 3.16548 7.87869 2.40303 6.006 2.40303C2.4345 2.40303 0 5.0248 0 8.00774C0 10.8837 2.27399 12.141 4.50784 12.141ZM13.3496 4.0617L13.8579 2.18901H11.2094L10.7011 4.0617H13.3496ZM11.1693 11.9538L13.1088 4.71715H10.5673L8.62776 11.9538H11.1693ZM18.2855 4.03495L20.7066 2.33615L18.3925 1.5737L16.3326 4.03495H18.2855ZM40.5084 3.2481L42.9295 1.5493L40.6154 0.78685L38.5555 3.2481H40.5084ZM14.2458 12.1009C15.0886 12.1009 15.7172 11.7531 16.3326 11.1779L16.1319 11.9538H18.6333L19.7034 7.96761C19.797 7.60644 19.8505 7.25866 19.8505 6.92425C19.8505 5.4796 18.7938 4.62351 16.6268 4.62351C15.5835 4.62351 14.5401 4.7974 13.7777 5.06493L14.1388 6.91087C14.6471 6.71023 15.4096 6.54971 16.0918 6.54971C16.9746 6.54971 17.3358 6.85737 17.3358 7.32554C17.3358 7.49943 17.2957 7.64657 17.2689 7.76696L17.2422 7.8606C16.667 7.6867 16.065 7.57969 15.4096 7.57969C13.4968 7.57969 12.226 8.54279 12.226 10.1346C12.226 11.3385 13.0553 12.1009 14.2458 12.1009ZM15.423 10.5359C14.9949 10.5359 14.7006 10.2817 14.7006 9.86705C14.7006 9.21161 15.2223 8.82369 16.0249 8.82369C16.3727 8.82369 16.6937 8.89058 16.9746 8.98421L16.9077 9.22499C16.7071 9.96069 16.0784 10.5359 15.423 10.5359ZM26.6056 12.1143C28.9331 12.1143 30.5918 10.8034 30.5918 8.8772C30.5918 7.47268 29.6019 6.81724 28.1573 6.26881C26.8732 5.7605 26.5923 5.62674 26.5923 5.2522C26.5923 4.87766 26.9802 4.58338 27.6089 4.58338C28.5586 4.58338 29.3745 4.99805 30.0835 5.61336L31.6887 3.82093C30.7924 2.96484 29.4949 2.42978 27.8496 2.42978C25.5623 2.42978 23.8768 3.75405 23.8768 5.61336C23.8768 6.99113 24.8266 7.6332 26.3113 8.19501C27.6222 8.70331 27.8764 8.89058 27.8764 9.25174C27.8764 9.67978 27.435 9.94731 26.8197 9.94731C25.7897 9.94731 24.8399 9.51927 23.9304 8.67655L22.2583 10.4021C23.2615 11.4856 24.7731 12.1143 26.6056 12.1143ZM34.8455 4.03495L36.1831 3.21899L37.0927 4.03495H38.6042L37.4806 1.84122H35.4207L33.1199 4.03495H34.8455ZM34.4709 12.1277C36.9054 12.1277 38.738 10.1078 38.738 7.9141C38.738 6.01466 37.4004 4.55663 35.1799 4.55663C32.7588 4.55663 30.9262 6.57646 30.9262 8.75681C30.9262 10.6696 32.2638 12.1277 34.4709 12.1277ZM34.6181 10.0142C33.869 10.0142 33.3607 9.49251 33.3607 8.66318C33.3607 7.72683 34.0429 6.6701 35.0461 6.6701C35.7952 6.6701 36.3035 7.19178 36.3035 8.00774C36.3035 8.95746 35.6213 10.0142 34.6181 10.0142ZM42.2292 12.1277C43.6739 12.1277 44.5835 11.5659 45.3192 10.7098L43.7675 9.35875C43.3261 9.80017 42.9382 10.0276 42.4031 10.0276C41.7744 10.0276 41.2929 9.5594 41.2929 8.82369C41.2929 7.72683 42.0687 6.6701 43.0318 6.6701C43.6873 6.6701 44.035 7.01788 44.2758 7.57969L46.2689 6.54971C45.881 5.43947 44.8778 4.57 43.1923 4.57C40.7846 4.57 38.845 6.52296 38.845 8.95746C38.845 10.9104 40.2763 12.1277 42.2292 12.1277Z"
      fill="white"
    />
  );
};

export const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.01171 0.93071C1.23685 0.73762 1.55463 0.695347 1.82242 0.822865L17.5724 8.32287C17.8336 8.44724 18 8.71073 18 9.00001C18 9.28929 17.8336 9.55278 17.5724 9.67716L1.82242 17.1772C1.55463 17.3047 1.23685 17.2624 1.01171 17.0693C0.786571 16.8762 0.696372 16.5686 0.7816 16.2845L2.96696 9.00001L0.7816 1.71552C0.696372 1.43143 0.786571 1.1238 1.01171 0.93071ZM4.308 9.75001L2.70424 15.0959L13.9305 9.75001H4.308ZM13.9305 8.25001H4.308L2.70424 2.90417L13.9305 8.25001Z"
      fill="#c4c4cf"
    ></path>
  </svg>
);

export const ScrollDownIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_321_46221)">
      <rect x="8" y="4" width="32" height="32" rx="16" fill="white"></rect>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.0001 12.5C24.4603 12.5 24.8334 12.8731 24.8334 13.3333V24.6548L28.4108 21.0774C28.7363 20.752 29.2639 20.752 29.5893 21.0774C29.9148 21.4028 29.9148 21.9305 29.5893 22.2559L24.5893 27.2559C24.4331 27.4122 24.2211 27.5 24.0001 27.5C23.7791 27.5 23.5671 27.4122 23.4108 27.2559L18.4108 22.2559C18.0854 21.9305 18.0854 21.4028 18.4108 21.0774C18.7363 20.752 19.2639 20.752 19.5893 21.0774L23.1667 24.6548V13.3333C23.1667 12.8731 23.5398 12.5 24.0001 12.5Z"
        fill="#515158"
      ></path>
      <rect x="8.5" y="4.5" width="31" height="31" rx="15.5" stroke="#DDDDE3"></rect>
    </g>
    <defs>
      <filter
        id="filter0_d_321_46221"
        x="0"
        y="0"
        width="48"
        height="48"
        filterUnits="userSpaceOnUse"
        // eslint-disable-next-line react/no-unknown-property
        color-interpolationfilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        ></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="4"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_321_46221"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_321_46221" result="shape"></feBlend>
      </filter>
    </defs>
  </svg>
);

export const StoreApp = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.48208 2.21289H2.26439C1.78411 2.21289 1.39478 2.60223 1.39478 3.0825V8.30019C1.39478 8.78047 1.78411 9.16981 2.26439 9.16981H7.48208C7.96235 9.16981 8.35169 8.78047 8.35169 8.30019V3.0825C8.35169 2.60223 7.96235 2.21289 7.48208 2.21289Z"
      stroke="#262626"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="square"
    ></path>
    <path
      d="M14.7216 1.58596L11.2031 5.10448C10.8791 5.42846 10.8791 5.95374 11.2031 6.27773L14.7216 9.79624C15.0456 10.1202 15.5709 10.1202 15.8948 9.79624L19.4134 6.27773C19.7373 5.95374 19.7373 5.42846 19.4134 5.10448L15.8948 1.58596C15.5709 1.26198 15.0456 1.26198 14.7216 1.58596Z"
      stroke="#262626"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="square"
    ></path>
    <path
      d="M17.9174 12.6483H12.6998C12.2195 12.6483 11.8301 13.0376 11.8301 13.5179V18.7356C11.8301 19.2158 12.2195 19.6052 12.6998 19.6052H17.9174C18.3977 19.6052 18.7871 19.2158 18.7871 18.7356V13.5179C18.7871 13.0376 18.3977 12.6483 17.9174 12.6483Z"
      stroke="#262626"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="square"
    ></path>
    <path
      d="M7.48208 12.6483H2.26439C1.78411 12.6483 1.39478 13.0376 1.39478 13.5179V18.7356C1.39478 19.2158 1.78411 19.6052 2.26439 19.6052H7.48208C7.96235 19.6052 8.35169 19.2158 8.35169 18.7356V13.5179C8.35169 13.0376 7.96235 12.6483 7.48208 12.6483Z"
      stroke="#262626"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="square"
    ></path>
  </svg>
);
