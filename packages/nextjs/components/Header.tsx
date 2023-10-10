import React from "react";
import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="flex flex-row items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10 text-3xl">💸</div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scholarship.BuidlGuidl.com</span>
            <span className="text-xs">small eth grants for new devs to get an ens </span>
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
