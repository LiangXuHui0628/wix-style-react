export const controlledExample = `() => {
    const [ active, setActive ] = React.useState(false);
    return (
         <Layout>
          <Cell span="8">
            <Animate onEnd={()=>setActive(false)} active={active}>
              <FormField labelPlacement="left" label="Field label">
                <Input />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4">
            <Button onClick={() => setActive(true)}>Play</Button>
          </Cell>
        </Layout>
   )
}
`;

export const onEndExample = `() => {
    const [ active, setActive ] = React.useState(false);
    const inputRef = React.useRef(null);
    return (
        <Layout>
          <Cell span='8'>
            <Animate
              onEnd={() => {
                inputRef.current.focus();
                setActive(false);
              }}
              active={active}
            >
              <FormField labelPlacement="left" label="Field label">
                <Tooltip content="I am here" >
                   <Input ref={inputRef} />
                </Tooltip>
              </FormField>
            </Animate>
          </Cell>
          <Cell span='4'><Button onClick={() => setActive(true)}>Play</Button></Cell>
    </Layout>
   )
}
`;

export const loopExample = `() => {
    const [ active, setActive ] = React.useState(false);

    return (
        <Layout>
          <Cell span='8'>
            <Animate loop active={active}>
              <FormField labelPlacement="left" label="Field label">
                <Input />
              </FormField>
            </Animate>
          </Cell>
          <Cell span='4'>
             <Button onClick={() => setActive(!active)}>{active ? 'Stop' : 'Play'}</Button>
         </Cell>
        </Layout>
   )
}
`;

export const delayExample = `() => {
    const [ active, setActive ] = React.useState(false);

    return (
        <Layout>
          <Cell span='8'>
            <Animate onEnd={()=>setActive(false)} delay="500ms" active={active}>
              <FormField label="With delay" labelPlacement="left">
                <Input />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setActive(true)}>Play</Button></Cell>
        </Layout>
   )
}
`;

export const childSizeExamples = `() => {
    const [ active1, setActive1 ] = React.useState(false);
    const [ active2, setActive2 ] = React.useState(false);
    return (
    <Layout>
      <Cell>
        <Layout>
          <Cell span='5'>
            <Animate onEnd={()=>setActive1(false)} active={active1}>
               <FormField labelPlacement="left" label="Small">
                <Input placeholder="I scale to 1.03" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setActive1(true)}>Play</Button></Cell>
        </Layout>
      </Cell>
      <Cell>
        <Layout>
          <Cell span='8'>
            <Animate onEnd={()=>setActive2(false)} active={active2}>
              <FormField labelPlacement="left" label="Medium">
                <Input placeholder="I scale to 1.07" />
              </FormField>
            </Animate>
          </Cell>
          <Cell span="4"><Button onClick={() => setActive2(true)}>Play</Button></Cell>
        </Layout>
      </Cell>
    </Layout>
   )
}
`;
