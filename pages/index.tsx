import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <main className="max-w-screen-lg">
        <h1 className="text-4xl font-bold py-4" id="our-story">
          Our Story
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          maximus, urna vel vulputate tempor, diam metus rhoncus mauris, viverra
          volutpat odio leo eu purus. Nullam feugiat nibh posuere vulputate
          dapibus. Quisque ornare congue leo ac fringilla. Nam non diam
          ultrices, dapibus enim in, rhoncus erat. Nam nec justo lacinia massa
          volutpat convallis ut sit amet sapien. Sed at odio facilisis, varius
          eros ut, gravida nisi. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Vestibulum mollis ultricies
          tortor vitae porta. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Donec vehicula, purus
          porta lacinia lacinia, nibh diam sollicitudin nulla, pellentesque
          interdum arcu arcu nec erat. Fusce fringilla ullamcorper tellus, in
          facilisis mauris ultricies non. Donec dui orci, porta eu aliquet in,
          pharetra eu arcu. Curabitur pharetra quis massa ut sollicitudin. Cras
          at molestie quam.
          <br />
          <br />
          Cras sagittis ullamcorper diam, sed commodo enim rutrum in. Aliquam
          convallis eros vitae rhoncus hendrerit. Pellentesque vel dui eget
          neque ultrices sodales. Vestibulum quis viverra ante. Donec commodo
          cursus ipsum, sed dapibus dolor venenatis in. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Suspendisse volutpat tincidunt lorem quis aliquet. Nulla
          facilisi.
          <br />
          <br />
          Ut nisl metus, auctor id neque et, mollis pulvinar nibh. Nam in erat
          luctus, sodales lacus eget, sollicitudin urna. Proin vel cursus nisl.
          Vestibulum mauris purus, elementum vitae pellentesque in, dictum vel
          ex. Nullam in arcu ex. Donec varius viverra orci, eu congue ligula
          efficitur quis. Curabitur et libero vulputate, laoreet mauris eget,
          semper ante. Curabitur et ipsum a eros convallis maximus nec quis
          orci. Suspendisse finibus suscipit nulla, id dignissim sapien sagittis
          non. Vestibulum at risus vitae lacus tincidunt tempus. Aliquam nec
          felis eros. Maecenas vel leo libero. Nulla in placerat ante.
          Vestibulum nisi magna, volutpat at molestie in, suscipit quis diam.
          Aenean vulputate nisl ac purus rutrum efficitur.
          <br />
          <br />
          Aliquam rhoncus hendrerit volutpat. Nullam finibus vitae velit ut
          rhoncus. In et eleifend arcu, quis rhoncus massa. Morbi ac libero
          velit. Vestibulum eget nulla eu magna maximus aliquet a in nibh.
          Curabitur et rutrum urna. In elementum id turpis a condimentum.
          Aliquam vitae erat pretium, rutrum purus vitae, eleifend est.
          Curabitur pretium efficitur elementum. Suspendisse libero risus,
          iaculis ultricies dignissim ut, pellentesque a enim. Nullam faucibus,
          ligula vitae placerat commodo, arcu elit porttitor nisl, ut fringilla
          justo sem ac felis. Integer dictum, justo ac eleifend vestibulum,
          felis massa aliquet elit, a gravida quam ex ut enim.
          <br />
          <br />
          Proin tristique tortor tristique elit tempor, sed gravida risus
          facilisis. Cras sed iaculis tortor, sit amet faucibus dui. Sed
          sollicitudin vitae sem vel ullamcorper. Aenean vel hendrerit quam.
          Duis orci lorem, bibendum ac euismod a, viverra vestibulum velit.
          Vivamus aliquet purus vel neque blandit, at ultricies odio
          ullamcorper. Curabitur dignissim et nisi quis ornare. Morbi laoreet
          lectus nibh, vitae hendrerit nunc dapibus ac. Quisque eget ipsum at
          tellus tincidunt sodales vel ac justo. Etiam sed lectus in nibh
          posuere lacinia vitae nec justo. Nullam sodales felis ac urna
          sollicitudin, eget pharetra diam mollis. Pellentesque in dolor ligula.
          Quisque iaculis, risus id dignissim luctus, ex lectus vulputate orci,
          at sagittis massa arcu eget dolor. Aenean ac venenatis mi, et
          consectetur turpis. Sed vel enim eu dui venenatis dapibus hendrerit
          eget nulla.
        </p>
        <div className="w-full flex">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold py-8" id="ceremony">
              Ceremony
            </h1>
            <p>1234 Address Street</p>
            <p>City, State 12345</p>
            <div className="py-2">
              <Link href="/rsvp/ceremony">
                <a className="text-blue-500">RSVP Here</a>
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-4xl font-bold py-8" id="reception">
              Reception
            </h1>
            <p>1234 Address Street</p>
            <p>City, State 12345</p>
            <div className="py-2">
              <Link href="/rsvp/reception">
                <a className="text-blue-500">RSVP Here</a>
              </Link>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold py-8" id="registry">
          Registry
        </h1>
        <div>
          <a className="text-blue-500 cursor-pointer">Link to registry</a>
        </div>
        <div>
          <a className="text-blue-500 cursor-pointer">Link to registry</a>
        </div>
        <div>
          <a className="text-blue-500 cursor-pointer">Link to registry</a>
        </div>
      </main>
    </div>
  );
}
