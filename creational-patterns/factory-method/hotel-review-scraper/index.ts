// factory method implementation example

interface IHotelReview {
  rating: number;
  comment: string;
  author: string;
  date: Date;
}

enum TravelAgencyType {
  BOOKING_COM = "booking_com",
  EXPEDIA = "expedia",
}

interface ITravelAgency {
  findHotelDetilUrl(search: string): Promise<string>;
  getHotelReviews(url: string): Promise<IHotelReview[]>;
}

class BookingCom implements ITravelAgency {
  findHotelDetilUrl(search: string): Promise<string> {
    return Promise.resolve(`https://www.booking.com/hotel/${search}`);
  }
  getHotelReviews(url: string): Promise<IHotelReview[]> {
    return Promise.resolve([
      {
        rating: 4.5,
        comment: "Great hotel!",
        author: "John Doe",
        date: new Date(),
      },
    ]);
  }
}

class Expedia implements ITravelAgency {
  findHotelDetilUrl(search: string): Promise<string> {
    return Promise.resolve(`https://www.expedia.com/hotel/${search}`);
  }
  getHotelReviews(url: string): Promise<IHotelReview[]> {
    return Promise.resolve([
      {
        rating: 4.5,
        comment: "Great hotel!",
        author: "John Doe",
        date: new Date(),
      },
    ]);
  }
}

class TravelAgencyFactory {
  static createTravelAgency(type: TravelAgencyType): ITravelAgency {
    switch (type) {
      case TravelAgencyType.BOOKING_COM:
        return new BookingCom();
      case TravelAgencyType.EXPEDIA:
        return new Expedia();
      default:
        throw new Error(`Travel agency type ${type} not supported`);
    }
  }
}

// client code
async function main() {
  const bookingCom = TravelAgencyFactory.createTravelAgency(
    TravelAgencyType.BOOKING_COM,
  );
  const expedia = TravelAgencyFactory.createTravelAgency(
    TravelAgencyType.EXPEDIA,
  );

  const bookingComReviews = await bookingCom.getHotelReviews("1234567890");
  console.log(bookingComReviews);

  const expediaReviews = await expedia.getHotelReviews("1234567890");
  console.log(expediaReviews);
}

main();
