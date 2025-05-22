import Image from 'next/image';
import research from '../../../public/images/research.png';
export default function Research() {
  return (
    <div className="bg-white text-black text-center font-rubik">
      <p className="text-customPink text-3xl mt-10 font-extrabold">
        Want to backtest your investment strategy?
      </p>
      <p className="mt-4 font-light">
        You&aposre in the right place. We specialize in helping investors put
        their ideas to the test.
      </p>
      <p className="mt-4 font-light">
        Reach out to us—we’d be happy to assist!
      </p>
      <p className="font-light">
        Just send an email with a few details about what you’re trying to
        achieve, and we’ll get back to
      </p>
      <p className="font-light">you shortly.</p>
      <p className="font-extrabold py-4">support@nerdymarkets.com</p>
      <div className="flex items-center justify-center">
        <Image
          src={research}
          alt="research-photo"
          width={480}
          className="rounded-md"
        />
      </div>
    </div>
  );
}
