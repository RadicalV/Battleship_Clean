import { BoundaryShotResult, BoundaryShip } from "boundary/model/index";
import { ViewShotResult, ViewShip } from "controllers/model/index";
import { ShotResultB2VConverter, ShipB2VConverter } from "./index";
import { mock, MockProxy } from "jest-mock-extended";
import { IN_PROGRESS } from "utils/Constants";

describe(ShotResultB2VConverter, () => {
  let converter: ShotResultB2VConverter;
  let shipConverter: MockProxy<ShipB2VConverter>;

  beforeEach(() => {
    shipConverter = mock<ShipB2VConverter>();
    converter = new ShotResultB2VConverter(shipConverter);
  });

  it("Converts BoundaryShotResult model to ViewShotResult model when ship is undefined", () => {
    const inputShotResult: BoundaryShotResult = new BoundaryShotResult(
      [[0, 0, 0, 0]],
      IN_PROGRESS
    );
    const expectedShotResult: ViewShotResult = new ViewShotResult(
      [[0, 0, 0, 0]],
      IN_PROGRESS
    );

    const shotResult: ViewShotResult = converter.convert(inputShotResult);

    expect(shipConverter.convert).toBeCalledTimes(0);
    expect(shotResult.grid).toEqual(expectedShotResult.grid);
    expect(shotResult.ship).toEqual(expectedShotResult.ship);
  });

  it("Converts BoundaryShotResult model to ViewShotResult model when ship is defined", () => {
    const boundaryShip: BoundaryShip = mock<BoundaryShip>();
    const viewShip: ViewShip = mock<ViewShip>();
    const inputShotResult: BoundaryShotResult = new BoundaryShotResult(
      [[0, 0, 0, 0]],
      IN_PROGRESS,
      boundaryShip
    );
    const expectedShotResult: ViewShotResult = new ViewShotResult(
      [[0, 0, 0, 0]],
      IN_PROGRESS,
      viewShip
    );

    shipConverter.convert.calledWith(boundaryShip).mockReturnValue(viewShip);

    const shotResult: ViewShotResult = converter.convert(inputShotResult);

    expect(shotResult.grid).toEqual(expectedShotResult.grid);
    expect(shotResult.ship).toEqual(expectedShotResult.ship);
  });
});
