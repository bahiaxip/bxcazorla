import { IconPipePipe } from './icon-pipe.pipe';

describe('IconPipePipe', () => {
  //let pipe:IconPipePipe;
  /*
  beforeEach(()=> {
    pipe=new IconPipePipe();
  })
  */
  it('create an instance', () => {
    const pipe = new IconPipePipe();
    expect(pipe).toBeTruthy();
  });
});
