export abstract class Converter<I, O> {
  convertAll(input: I[]): O[] {
    return input.map((element) => this.convert(element));
  }

  abstract convert(input: I): O;
}
